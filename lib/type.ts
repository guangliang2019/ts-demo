interface ButtonProps {
  /**
   * 按钮的变体类型，默认为 secondary
   */
  variant?: ButtonVariant;
}

/**
 * 按钮的变体枚举
 */
enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Outlined = "outlined",
  Ghost = "ghost",
  Link = "link",
}

let b: typeof ButtonVariant[keyof typeof ButtonVariant]

let a: keyof ButtonProps