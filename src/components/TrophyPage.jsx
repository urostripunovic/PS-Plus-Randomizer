import React from 'react'

export default function TrophyPage({ psTitle }) {
  const { data, isLoading } = psTitle
  console.log(data, isLoading);
  return (
    <div>TrophyPage</div>
  )
}
