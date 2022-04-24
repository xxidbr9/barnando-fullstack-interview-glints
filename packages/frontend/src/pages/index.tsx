import { getAllRestaurant } from '@features/restaurant/restaurant.selector'
import { restaurantThunkAction } from '@features/restaurant/restaurant.slice'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce } from 'react-use'
import InfiniteScroll from 'react-infinite-scroller';
import cutString from '@utils/helpers/cutString'
import ContentLoader from "react-content-loader"
import Lottie from 'react-lottie';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
import colors from '@styles/colors'
import { IRestaurant } from '@models/restaurant.model'
import FavoriteOutline from '@components/Icon/FavoriteOutline.icon'
import FavoriteFill from '@components/Icon/FavoriteFill.icon'
import animatedData from '../assets/lottie/loading.json'
import BrandImage from '../assets/images/brand_logo.png'
import Container from '@components/Container'
import { accountSelector } from '@features/account'
import MenuIcon from '@components/Icon/Menu.icon'
import { Menu, Transition } from '@headlessui/react'
import { signOut } from 'next-auth/client'
import UserIcon from '@components/Icon/User.icon'
import { screenSelector } from '@features/screen'
import SearchIcon from '@components/Icon/Search.icon'
import FavoriteOnlyOutline from '@components/Icon/FavoriteOnlyOutline.icon'
import UserOutlineIcon from '@components/Icon/UserOutline.icon'
import ROUTES_CONSTANT from '@utils/constants/routes'
import Link from 'next/link'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { ISearchRestaurantParams } from '@networks/restaurant.network'
import { useDebounce } from '@utils/hooks/useDebounce'
import queryString from 'query-string'
import SettingIcon from '@components/Icon/Setting.icon'

type RestaurantCardProps = {
  restaurant: IRestaurant
  isFavorite?: Boolean
  onFavoriteClick?: (id: string) => void
}

const RestaurantCard: React.FC<RestaurantCardProps> = (props) => {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='w-full h-72 relative isolate rounded-xl overflow-hidden'>
        <div className='absolute z-50 left-auto right-4 top-4'>
          <button>
            {!props.isFavorite && (<FavoriteOutline />)}
            {!!props.isFavorite && (<FavoriteFill fill={colors.red[500]} />)}
          </button>
        </div>
        <Swiper
          spaceBetween={0} slidesPerView={1} pagination={{
            clickable: true
          }}
          className="w-full h-full absolute z-10 bg-gray-200">
          {props.restaurant.pictures.map((pic, picIndex) => (
            <SwiperSlide key={`${props.restaurant.id}-${picIndex}`} className="z-0">
              <Image src={`https://source.unsplash.com/random/${props.restaurant.id}-${picIndex}`} alt="" layout='fill' className='object-cover z-10' />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='z-20 absolute rounded-xl h-80 w-full'>
          <ContentLoader speed={1.2} width={640} height={640} // viewBox="0 0 2000 2000"
            backgroundColor={colors.gray[100]} foregroundColor={colors.gray[200]} className="w-full h-full">
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
          </ContentLoader>
        </div>
      </div>
      <div className='flex flex-col'>
        <span className='font-medium'>
          {props.restaurant.name}
        </span>
        <span className='text-gray-500 text-sm'>
          {cutString(props.restaurant.address, 60)}
        </span>
      </div>
    </div>
  );
}


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animatedData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const LoaderNext = () => {
  return (
    <Lottie options={defaultOptions}
      height={200}
      width={200} />
  );
}



const NavbarItem = styled.div<{ isActive: boolean }>`
  ${tw`cursor-pointer py-3 px-4 text-sm hover:bg-gray-50 hover:text-gray-900`}
  ${props => props.isActive ? tw`text-gray-900 bg-gray-50` : tw`text-gray-400`}
`

const Navbar = () => {
  const rdxProfile = useSelector(accountSelector.getAccountProfile)
  const rdxUserIsLogin = useSelector(accountSelector.getIsLogin)

  const _handleLogout = () => signOut()
  const _handleLogin = () => { }

  return (
    <nav className='bg-white border-b'>
      <Container className='flex justify-between items-center laptop:py-6'>
        <div className='flex items-center  gap-x-2'>
          <Image src={BrandImage} width={42} height={42} />
          <span className='text-lg font-medium text-red-500'>Air Restaurant</span>
        </div>
        <Menu as="div" className="relative inline-block text-left">
          {({ open }) => (
            <React.Fragment>
              <Menu.Button className={`flex items-center rounded-full border p-[5px] gap-3 pl-[12px] ${open && "shadow-md"} hover:shadow-md transition-all duration-150`}>
                <MenuIcon />
                {rdxUserIsLogin && <img src={rdxProfile?.picture_profile_url} width={30} height={30} className="rounded-full" />}
                {!rdxUserIsLogin && (
                  <div className='w-[30px] h-[30px] relative'>
                    <span className='absolute z-auto bg-red-500 h-3 w-3 rounded-full border-2 border-white -top-[1px] -right-[1px]' />
                    <UserIcon />
                  </div>
                )}

              </Menu.Button>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-[999] right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className='flex flex-col py-2'>
                    {rdxUserIsLogin && (
                      <React.Fragment>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href={ROUTES_CONSTANT.FAVORITE} passHref>
                              <NavbarItem isActive={active} as="a">
                                Favorite
                              </NavbarItem>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item onClick={_handleLogout}>
                          {({ active }) => (
                            <NavbarItem isActive={active}>
                              Log out
                            </NavbarItem>
                          )}
                        </Menu.Item>
                      </React.Fragment>
                    )}
                    {!rdxUserIsLogin && (
                      <Menu.Item onClick={_handleLogin}>
                        {({ active }) => (
                          <NavbarItem isActive={active}>
                            Log in
                          </NavbarItem>
                        )}
                      </Menu.Item>
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </React.Fragment>
          )}
        </Menu>
      </Container>
    </nav>
  );
}


type BottomNavProps = {
  activeIndex?: 0 | 1 | 2
}
const BottomNav: React.FC<BottomNavProps> = (props) => {
  const menus = [
    { icon: (active) => <SearchIcon stroke={active ? colors.red[500] : colors.gray[400]} />, text: "Search", href: ROUTES_CONSTANT.HOME },
    { icon: (active) => <FavoriteOnlyOutline stroke={active ? colors.red[500] : colors.gray[400]} />, text: "Favorite", href: ROUTES_CONSTANT.FAVORITE },
  ]
  return (
    <div className='fixed bg-white w-full h-auto z-[9999] bottom-0 pt-4 pb-4 flex justify-center gap-x-12'>
      {menus.map((menu, index) => (
        <div className='flex items-center flex-col gap-y-1' key={index}>
          {menu.icon(index === props.activeIndex)}
          <span className={`text-sm ${props.activeIndex === index ? "text-red-500" : "text-gray-500"}`}>{menu.text}</span>
        </div>
      ))}
      <div className='flex items-center flex-col gap-y-1 relative' key={2}>
        <span className='absolute z-auto bg-red-500 h-3 w-3 rounded-full border-2 border-white top-0 right-1' />
        <UserOutlineIcon stroke={colors.gray[200]} />
        <span className={`text-sm text-gray-500`}>Log in</span>
      </div>
    </div>);
}


const HomePage = () => {
  const dispatch = useDispatch()
  const rdxRestaurants = useSelector(getAllRestaurant)
  const rdxScreenIsMobile = useSelector(screenSelector.isMobile)

  const router = useRouter()

  const openTime = router.query?.open as string || ""
  const closeTime = router.query?.close as string || ""
  const dayOpen = router.query?.days as string || ""
  const searchQuery = router.query?.q as string || ""

  const [searchValue, setDebValue] = useDebounce(searchQuery, 500)
  const [val, setVal] = useState(searchQuery);

  const request: ISearchRestaurantParams = useMemo(() => ({
    close: closeTime,
    open: openTime,
    day_open: dayOpen,
    q: searchValue,
  }), [searchValue])

  useEffectOnce(() => {
    dispatch(restaurantThunkAction.fetchRestaurant(request))
  })

  useEffect(() => {
    if (rdxRestaurants.loading) {
      return
    }
    dispatch(restaurantThunkAction.fetchRestaurant(request))
  }, [request])


  const isWindows = typeof window !== "undefined"
  useEffect(() => {
    if (rdxRestaurants.loading) {
      return
    }

    if (isWindows && !!val) {
      const params = queryString.stringify({ q: val })
      window.history.replaceState("", "search", `?${params}`)
    }

    setDebValue(val)
  }, [val, isWindows, rdxRestaurants.loading])

  useEffect(() => {
    if (searchValue === "") {
      router.replace("")
    }
  }, [searchValue])

  const _handleNext = () => {
    if (rdxRestaurants.loading) {
      return
    }
    const nextPage = rdxRestaurants.page + 1
    dispatch(restaurantThunkAction.fetchNextRestaurant({ ...request, page: nextPage }))
  }

  return (
    <div className='relative'>
      {!rdxScreenIsMobile && (<Navbar />)}
      <div className='laptop:relative laptop:pt-2 laptop:pb-10 mobile:py-6'>
        <Container className='flex justify-between gap-4 items-center'>
          <div className='w-full relative'>
            <SearchIcon stroke={colors.gray[500]} className="absolute mt-4 left-4" />
            <input
              defaultValue={searchQuery}
              type="text"
              className='rounded-full w-full flex flex-row gap-x-6 items-center pr-6 py-4 bg-gray-100 pl-12 outline-none'
              placeholder='Find your favorite restaurant'
              onChange={({ currentTarget }) => {
                setVal(currentTarget.value);
              }}
            />
          </div>
          <button className='flex items-center gap-x-2 bg-white px-3 py-3 rounded-full border'>
            <SettingIcon />
            <span className='text-sm text-gray-500'>Filter</span>
          </button>
        </Container>
        <InfiniteScroll
          pageStart={0}
          loadMore={_handleNext}
          hasMore={rdxRestaurants.is_have_next}
          useWindow={true}
          loader={<LoaderNext key={0} />}
          className="mt-4"
        >
          <Container>
            <div className='grid desktop:grid-cols-5 laptop:grid-cols-2 tablet:grid-cols-2 tablet:gap-x-6 mobile:grid-cols-1 laptop:gap-x-6 laptop:gap-y-8 mobile:gap-y-9 '>
              {rdxRestaurants.restaurants.map((restaurant, index) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </Container>
        </InfiniteScroll>

      </div>
      {!!rdxScreenIsMobile && (<BottomNav activeIndex={0} />)}
    </div>
  )
}

export default HomePage
