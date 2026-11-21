/* eslint-disable react-refresh/only-export-components, @typescript-eslint/no-explicit-any */
// Thin bridge so the imported portfolio components keep their original
// Link / useNavigate / useLocation / useParams / Outlet usage while running
// on TanStack Router.
import {
  createContext,
  forwardRef,
  useContext,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import {
  Link as TanLink,
  Outlet as TanOutlet,
  useParams as useTanParams,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children?: ReactNode;
};

function splitHash(to: string) {
  const i = to.indexOf("#");
  if (i === -1) return { path: to, hash: undefined as string | undefined };
  return { path: to.slice(0, i) || "/", hash: to.slice(i + 1) };
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...rest }, ref) {
  const { path, hash } = splitHash(to);
  const props: Record<string, unknown> = { ...rest, to: path, ref };
  if (hash) props["hash"] = hash;
  return <TanLink {...(props as any)} />;
});

export function useNavigate() {
  const router = useRouter();
  return (to: string) => {
    void router.navigate({ href: to });
  };
}

export function useLocation() {
  const location = useRouterState({ select: (s) => s.location });
  return {
    pathname: location.pathname,
    search: location.searchStr,
    hash: location.hash ? `#${location.hash}` : "",
  };
}

export function useParams<
  T extends Record<string, string | undefined> = Record<string, string | undefined>,
>() {
  return (useTanParams as any)({ strict: false }) as T;
}

const OutletCtx = createContext<unknown>(undefined);

export function Outlet({ context }: { context?: unknown }) {
  return (
    <OutletCtx.Provider value={context}>
      <TanOutlet />
    </OutletCtx.Provider>
  );
}

export function useOutletContext<T>() {
  return useContext(OutletCtx) as T;
}
