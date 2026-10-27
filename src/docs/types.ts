export interface MenuItem {
  href: string
  children: string
}

export interface MenuGroup {
  title: string
  children: MenuItem[]
}
