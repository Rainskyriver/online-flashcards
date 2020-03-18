import React from 'react'
import { Button } from '@material-ui/core'
import FlashCard from '../FlashCard'

export default function Root() {

  return (
  <div>
    <p>Mustache health goth quinoa hot chicken messenger bag, gluten-free woke normcore blue bottle pabst iPhone cray bicycle rights retro. Cred keffiyeh letterpress hammock flexitarian four loko, vegan 90's ethical chicharrones mlkshk taiyaki master cleanse. Wayfarers tilde microdosing, activated charcoal unicorn lo-fi schlitz ramps polaroid beard man bun health goth banh mi readymade. Echo park try-hard af, la croix pinterest coloring book cred williamsburg tbh whatever helvetica gluten-free 8-bit shabby chic. Church-key kinfolk truffaut drinking vinegar asymmetrical, wayfarers twee pour-over jean shorts single-origin coffee plaid.</p>
    <FlashCard question="What's 2 + 2?" hint="Bill Wurtz" answer="One billion!" resources="https://www.youtube.com/watch?v=u8RANXbnxPk" />
    <Button>Get Started</Button>
  </div>
  )
}