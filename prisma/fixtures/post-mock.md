여러분은 프런트엔드 모의 서버로 어떤 것을 사용중이신가요? 다른 방법들도 많지만 최근에 사용해보고 가장 편리하다고 느낀 MSW를 소개하겠습니다. MSW(Mock Service Worker)는 브라우저 요청을 Service Worker가 가로채서 임의의 응답을 반환해주는 라이브러리입니다.
https://mswjs.io/

MSW를 사용하면 다음과 같은 Express식 핸들러로 모의 응답을 만들 수 있습니다. 이 코드는 브라우저에서 동작합니다.

```javascript
import { setupWorker, rest } from "msw";
const worker = setupWorker(
  rest.get("https://myapi.dev/csr", (req, res, ctx) => {
    return res(
      ctx.json({
        title: "CSR Source",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      })
    );
  })
);
worker.start();
```

예제 코드는 아래 링크의 저장소에서 테스트할 수 있습니다.
https://github.com/taro-yamada/nextjs-msw-example

# SSR, CSR을 동시에 대응하기

다음 컴포넌트는 직접 Native fetch함수로 API를 호출합니다. useSWR에도 특별한 사용법 같은건 없습니다. 위에 있는 MSW 핸들러를 실행중인 애플리케이션에 마운트만 하면 컴포넌트가 모의 응답을 받을 수 있습니다.

```typescript
const Card = () => {
  const { data, error } = useSWR<Source>("csr", () =>
    fetch("https://myapi.dev/csr").then((res) => res.json())
  );
  if (error) return <>error!</>;
  if (!data) return <>...loading</>;
  return (
    <div>
      <h2 role="title">{data.title}</h2>
      <p>{data.text}</p>
    </div>
  );
};
```

핸들러는 Service Worker(브라우저)뿐만 아니라 Node의 프로세스(서버)에서도 실행됩니다. 다음 코드는 Next.js의 페이지 컴포넌트에서 SSR과 CSR을 동시에 대응하는 예제입니다.

```typescript
import { Card } from "../components/organisms/Card";

const Home = (props: Props) => {
  return (
    <div>
      <h1>{props.data.title}</h1>
      <p>{props.data.text}</p>
      <Card />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data: Source = await fetch("https://myapi.dev/ssr").then((res) =>
    res.json()
  );
  return { props: { data } };
};

export default Home;
```

`https://myapi.dev/`에 요청하는 상황에서 MSW가 요청을 가로채는 동안에는 실제 요청이 발생하지는 않습니다. 가로채기 유무는 환경변수만 변경하면 되는데, 이는 핸들러에서도 변경이 가능합니다. 또, 요청 자체를 통제하기 위해 BaaS 같은 모의 서버를 사용할 수도 있습니다.

# 로컬 환경에서의 개발, 테스트, 스토리북 모두에 적용가능

여태까지 테스트나 스토리북에서 fetch를 재현하려면 각각의 코드에 인라인 모의 객체를 만들어야 했습니다. 또는 별도의 모의 서버 프로세스를 실행해서 여기에 의존하도록 만들었습니다. MSW를 사용하면 이런 작업들을 한 곳에서 처리할 수 있습니다.

서버 프로세스가 없어지면 스토리북 호스팅이 편리해 집니다. uswSWR과 같은 Render-as-You-Fetch가 뒤섞여 있어도 브라우저만으로 모든 처리가 가능하므로 정적 사이트로 S3나 Netlify에 배포할 수 있습니다.

위에서 소개한 Card 컴포넌트의 테스트, 스토리북입니다. Card 컴포넌트가 useSWR로 fetch하고 있음에도 불구하고 다음 코드는 동작합니다.

```typescript
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { cache } from "swr";
import { server } from "../../../.mocks/server";
import { Card } from "./Card";

beforeEach(() => cache.clear());
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("MSW and useSWR are in connect.", async () => {
  render(<Card />);
  await waitFor(() => screen.getByRole("title"));
  expect(screen.getByRole("title")).toHaveTextContent("CSR Source");
});
```

스토리북에서도 Container / Presentational을 구분할 필요가 없습니다.

```typescript
import { Story } from "@storybook/react";
import React from "react";
import { Card } from "./Card";

const Template: Story = (args) => <Card {...args} />;

export const Index: Story = Template.bind({});
Index.storyName = "useSwr connected component";

export default {
  title: "Card",
};
```

이 외에도 MSW Storybook Addon을 사용하면 에러 상태를 만드는 등의 추가적인 기능이 제공됩니다. 개발시에 유용하게 사용할 수 있는 강력한 도구이므로 꼭 한 번 사용해보세요.