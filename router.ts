import { createRouter } from "@tanstack/react-router";
import { Route as IndexRoute } from "./routes/index";
import { Route as WelcomeRoute } from "./routes/welcome";

const routeTree = createRouter({
  routeTree: IndexRoute.addChildren([WelcomeRoute]),
});

export const router = createRouter({
  routeTree,
  context: {
    auth: {
      player: null,
    },
  },
});

