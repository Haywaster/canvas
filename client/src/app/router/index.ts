import { Main as MainPage } from 'pages/Main/Main.tsx';

enum RouterPage {
  Main = MainPage,
}

enum RouterPath {
  Main = '/',
}

export const AppRouter = {
  [RouterPath.Main]: RouterPage.Main,
};