import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("registration", "routes/registration.tsx"),
  route("registration/:id", "routes/registration.$id.tsx"),
  route("registration/list", "routes/registration-list.tsx"),
] satisfies RouteConfig;
