import { Main as MainPage } from 'pages/Main';

enum RouterPath {
  Main = '/'
}

export const AppRouter = {
  [RouterPath.Main]: MainPage
};
