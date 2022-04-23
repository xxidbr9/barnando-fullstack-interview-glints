import { getAllRestaurant } from '@features/restaurant/restaurant.selector'
import { restaurantThunkAction } from '@features/restaurant/restaurant.slice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce } from 'react-use'
import InfiniteScroll from 'react-infinite-scroller';

const HomePage = () => {
  const rdxRestaurants = useSelector(getAllRestaurant)
  const dispatch = useDispatch()

  useEffectOnce(() => {
    dispatch(restaurantThunkAction.fetchNextRestaurant(rdxRestaurants.page))
  })

  const _handleNext = () => {
    if (rdxRestaurants.loading) {
      return
    }
    const nextPage = rdxRestaurants.page + 1
    dispatch(restaurantThunkAction.fetchNextRestaurant(nextPage))
  }

  return (
    <div>

      <InfiniteScroll
        pageStart={0}
        loadMore={_handleNext}
        hasMore={rdxRestaurants.is_have_next}
        useWindow={true}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {rdxRestaurants.restaurants.map((restaurant, index) => (
          <div style={style} key={index}>
            {index} - {restaurant.name}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

export default HomePage