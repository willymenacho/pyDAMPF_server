import { Box, Grid } from '@material-ui/core'
import React from 'react'
import ClienOptionsCards from './CLientOptionsCards'
import { charactersList } from './CharacterList'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default function ClientOptionsV2() {
  const cardsContent = charactersList
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <React.Fragment>
      <Grid container spacing={matches ? 5 : 0}>
        {cardsContent.map((cardContent, i) => (
          <Grid item sm={6} xs={12} key={`ClientOptionsCard-${i}`}>
            <Box my={matches ? '0px' : '20px'}>
              <ClienOptionsCards
                title={cardContent.title}
                description={cardContent.description}
                Description={cardContent.Description}
                textButton={cardContent.textButton}
                actionButton={cardContent.actionButton}
                character={cardContent.character}
                item={cardContent.item}
                index={i}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}
