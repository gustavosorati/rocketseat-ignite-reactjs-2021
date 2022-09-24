import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
      dark: {
        text: '#47585B',
        info: {
          50: 'rgba(153, 153, 153, 0.5)',
          100: '#999'
      },
      highlight: {
        50: 'rgba(255, 186, 8, 0.5)',
        100: "#FFBA08",
      },
      light: {
        text: '#F5F8FA',
        info: '#DADADA'
      }
    },
    }
});

export default theme;