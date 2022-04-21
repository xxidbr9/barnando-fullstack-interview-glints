import 'tailwindcss/tailwind.css'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'
import '@assets/scss/swiper.scss'
import 'react-spring-bottom-sheet/dist/style.css'

// END CSS
import React from 'react'
import { AppContext } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { createBreakpoint } from 'react-use'
import { useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper'
import moment from 'moment'
import 'moment/locale/id'

import { setScreenSize } from '@features/screen/screen.action'
import { wrapper } from '@redux-state/index'
import { breakScreen } from '@styles/breakpoint'
import gridConfig from '@utils/configs/grid.config'
import { locale } from '@utils/configs/localization.config'
import { ScreenType } from '@utils/types/screen'
import { setMobileDeviceOS } from '@features/devices/device.action'
import useMobileOS from '@utils/hooks/useMobileOS'
import NProgress from 'nextjs-progressbar'
import Head from 'next/head'
import BRAND_NAME from '@utils/constants/brand'
import { persistStore } from 'redux-persist'
import colors from '@styles/colors'

/* Configuration Start */
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])
const useScreen = createBreakpoint({ ...breakScreen } as {})
moment.locale(locale.id)
/* Configuration End */

const MainApp = ({ Component, pageProps }) => {
  const theme = {
    ...gridConfig,
  }

  // Redux config
  const store = useStore()

  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  const dispatch = useDispatch()


  const screen = useScreen()

  useEffect(() => {
    dispatch(setScreenSize(screen as ScreenType))
  }, [screen, dispatch])

  return (
    <>
      <Head>{BRAND_NAME}</Head>
      <NProgress color={colors?.['red'][500] as string} />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

MainApp.getInitialProps = wrapper.getInitialAppProps(
  store =>
    async ({ Component, ctx }: AppContext) => {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
          pathname: ctx.pathname,
        },
        creator: {
          url: 'https://github.com/xxidbr9',
          name: 'Barnando Akbarto Hidaytullah',
          email: 'barnando13@gmail.com',
        },
      }
    }
)

export default wrapper.withRedux(MainApp)
