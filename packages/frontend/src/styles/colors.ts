import baseTailwind from '@base/tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'
import { TailwindConfig } from 'tailwindcss/tailwind-config'

const config: TailwindConfig = {
  ...baseTailwind,
  darkMode: "class",
}

const twFullConfig = resolveConfig(config)
const colors = {
  ...twFullConfig.theme.colors,  
}


export default colors

