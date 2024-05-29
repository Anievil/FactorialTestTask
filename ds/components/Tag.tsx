import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from '../colors'
import Text from './Text'

export type TagProps = {
  tagText: string
  onPressFromExpandableSection: () => void
}

const Tag: React.FC<TagProps> = ({ tagText, onPressFromExpandableSection }) => {
  const opessOnTag = useCallback(() => {
    /* 
    Did I understand correctly,
    In TS "Tag – a blue rounded rectangle with the text inside. A Tag can be pressed and onPress event should be exposed from the component."
    'onPress event should be exposed from the component.' means that the onPress event should be accessible from the Tag component.

    Just in case, I added an implementation if onPress should be accessible from the ExpandableSection component
     */
    onPressFromExpandableSection()
    console.log('press on tag ', tagText)
  }, [])

  return (
    <TouchableOpacity onPress={opessOnTag} style={styles.tagConeinerStyle}>
      <Text typeface='P3-Medium'>{tagText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tagConeinerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 16,
    marginTop: 8,
    marginRight: 8,
    backgroundColor: colors.button.outlinedAllActive
  },
  aditionalTagTextStyle: { lineHeight: 18 }
})

export default Tag
