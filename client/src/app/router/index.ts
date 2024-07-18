import { Main as MainPage } from 'pages/Main/Main';

enum RouterPath {
  Main = '/'
}

export const AppRouter = {
  [RouterPath.Main]: MainPage
};
