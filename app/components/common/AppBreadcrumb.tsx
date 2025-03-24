import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink
} from "../ui/breadcrumb";

type Crumb = {
  label: string;
  href?: string;
};

type AppBreadcrumbProps = {
  items: Crumb[];
  max?: number;
};

export default function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  const lastIndex = items.length - 1;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, idx) => {
          const isLast = idx === lastIndex;

          return (
            <BreadcrumbItem key={idx}>
              {item.href && !isLast ? (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
              {idx !== lastIndex && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
