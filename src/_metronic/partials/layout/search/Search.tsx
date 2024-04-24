import React, { FC, useEffect, useRef, useState } from 'react'
import { SearchComponent } from '../../../assets/ts/components'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { t } from 'i18next'

const Search: FC = () => {
  const [menuState, setMenuState] = useState<'main' | 'advanced' | 'preferences'>('main')
  const element = useRef<HTMLDivElement | null>(null)
  const wrapperElement = useRef<HTMLDivElement | null>(null)
  const resultsElement = useRef<HTMLDivElement | null>(null)
  const suggestionsElement = useRef<HTMLDivElement | null>(null)
  const emptyElement = useRef<HTMLDivElement | null>(null)

  const processs = (search: SearchComponent) => {
    setTimeout(function () {
      const number = Math.floor(Math.random() * 6) + 1

      // Hide recently viewed
      // suggestionsElement.current!.classList.add('d-none')

      // if (number === 3) {
      //   // Hide results
      //   resultsElement.current!.classList.add('d-none')
      //   // Show empty message
      //   emptyElement.current!.classList.remove('d-none')
      // } else {
      //   // Show results
      //   resultsElement.current!.classList.remove('d-none')
      //   // Hide empty message
      //   emptyElement.current!.classList.add('d-none')
      // }

      // Complete search
      search.complete()
    }, 1500)
  }

  const clear = (search: SearchComponent) => {
    // Show recently viewed
    suggestionsElement.current!.classList.remove('d-none')
    // Hide results
    resultsElement.current!.classList.add('d-none')
    // Hide empty message
    emptyElement.current!.classList.add('d-none')
  }

  useEffect(() => {
    // Initialize search handler
    const searchObject = SearchComponent.createInsance('#kt_header_search')

    // Search handler
    // searchObject!.on('kt.search.process', processs)

    // Clear handler
    // searchObject!.on('kt.search.clear', clear)
  }, [])

  return (
    <>
      
    </>
  )
}

export { Search }
