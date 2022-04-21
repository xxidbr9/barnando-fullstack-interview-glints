import { getAllRestaurant } from '@features/restaurant/restaurant.selector'
import { restaurantThunkAction } from '@features/restaurant/restaurant.slice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';
import { useEffectOnce } from 'react-use'


const HomePage = () => {
  const rdxRestaurants = useSelector(getAllRestaurant)
  const dispatch = useDispatch()

  useEffectOnce(() => {
    dispatch(restaurantThunkAction.fetchNextRestaurant(rdxRestaurants.page + 1))
  })

  const _handleNext = () => {
    console.log(rdxRestaurants)
    dispatch(restaurantThunkAction.fetchNextRestaurant(rdxRestaurants.page + 1))
  }

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={_handleNext}
      hasMore={rdxRestaurants.is_have_next}
      loader={<div className="loader" key={0}>Loading ...</div>}
    >
      <pre>{JSON.stringify(rdxRestaurants.restaurants, null, 2)}</pre>
    </InfiniteScroll>
  )
}

export default HomePage