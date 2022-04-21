import React from 'react'
import { GetServerSideProps } from 'next'
import { infoRestaurantNetwork } from '@networks/restaurant.network'
import { IRestaurantInfoResponse } from '@models/restaurant.model'
import ROUTES_CONSTANT from '@utils/constants/routes'

type RestaurantDetailsProps = {
  restaurant: IRestaurantInfoResponse
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = (props) => {
  return (
    <pre>{JSON.stringify(props, null, 2)}</pre>
  )
}

export default RestaurantDetails


export const getServerSideProps: GetServerSideProps<RestaurantDetailsProps | { error: any }> = async (ctx) => {
  try {
    const id = ctx.params?.slug[1] as string
    const resp = await infoRestaurantNetwork(id)
    if (!!resp.data) throw new Error(resp.data?.error as string)
    return {
      props: {
        restaurant: resp.data.data.restaurant
      },
      notFound: true
    }

  } catch (err) {
    return {
      props: {
        error: err
      },
      redirect: {
        destination: ROUTES_CONSTANT.NOT_FOUND
      }
    }
  }
}