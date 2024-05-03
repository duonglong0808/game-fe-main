'use client';
import { Sidebar } from 'flowbite-react';
import { config } from './style';

type Props = {
  data: {
    title: string;
    href?: string;
    icon: any;
    children?: {
      title: string;
      href: string;
    }[];
  }[];
};
export default function SidebarMe({ data }: Props) {
  return (
    <Sidebar theme={config}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {data.map((item) => {
            if (!item.children) {
              return (
                <Sidebar.Item key={item.title} href={item.href} icon={item.icon}>
                  {item.title}
                </Sidebar.Item>
              );
            } else {
              return (
                <Sidebar.Collapse key={item.title} label={item.title} icon={item.icon}>
                  {item.children?.map((child) => (
                    <Sidebar.Item key={child.title} href={child.href}>
                      {child.title}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              );
            }
          })}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
