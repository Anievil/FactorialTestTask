import React, { useCallback, useState } from 'react'
import { TouchableOpacity, View, StyleSheet, ListRenderItem, FlatList } from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  SharedValue,
  Easing
} from 'react-native-reanimated'
import Text from './Text'
import ICArrow from '../../assets/arrowForDropDown.svg'
import { colors } from '../colors'
import Tag from './Tag'

export type ExpandableSectionProps = {
  title: string
  description?: string
  tags: string[]
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, tags, description }) => {
  const [isExpandableSectionOpen, setIsExpandableSectionOpen] = useState(false)
  const [hiddenConteinerSize, setHiddenConteinerSize] = useState(0)
  const [hiddenHeaderSize, setHeaderSize] = useState(0)
  const dynamicHeight: SharedValue<number> = useSharedValue(56)
  const iconPosition = useSharedValue('0deg')
  const config = {
    duration: 300,
    easing: Easing.linear
  }
  const conteinerAnimatedStyle = useAnimatedStyle(() => ({
    height: withTiming(dynamicHeight.value, config)
  }))

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(iconPosition.value, config) }]
  }))
  const toggleExpandableSection = useCallback(() => {
    if (isExpandableSectionOpen) {
      dynamicHeight.value = hiddenHeaderSize
      iconPosition.value = '0deg'
    } else {
      dynamicHeight.value = hiddenHeaderSize + hiddenConteinerSize
      iconPosition.value = '180deg'
    }
    setIsExpandableSectionOpen(!isExpandableSectionOpen)
  }, [isExpandableSectionOpen, hiddenConteinerSize, hiddenHeaderSize])

  const checkHiddenConteinerSize = useCallback(
    (event: { nativeEvent: { layout: { height: number } } }) => {
      setHiddenConteinerSize(event.nativeEvent.layout.height)
    },
    []
  )
  const checkHeaderSize = useCallback((event: { nativeEvent: { layout: { height: number } } }) => {
    setHeaderSize(event.nativeEvent.layout.height + 32)
  }, [])

  const onPressTag = useCallback(() => {
    console.log('Press on tag func from ExpandableSection component')
  }, [])
  const setKeyExtractor = useCallback((item: string) => item, [])
  const renderListItem: ListRenderItem<string> = useCallback(
    ({ item }) => <Tag tagText={item} onPressFromExpandableSection={onPressTag} />,
    []
  )

  return (
    <Animated.View style={[styles.expandableSectionStyle, conteinerAnimatedStyle]}>
      <TouchableOpacity onPress={toggleExpandableSection}>
        <View style={styles.expandableSectionHeader} onLayout={checkHeaderSize}>
          <Text typeface='H4' style={styles.aditionalTitleStyle}>
            {title}
          </Text>
          <Animated.View style={iconAnimatedStyle}>
            <ICArrow height={20} width={20} />
          </Animated.View>
        </View>
        <View style={styles.hiddenSection} onLayout={checkHiddenConteinerSize}>
          <Text typeface={'P3'} style={styles.aditionalDescriptionStyle} color={'secondary'}>
            {description}
          </Text>
          <FlatList
            data={tags}
            keyExtractor={setKeyExtractor}
            renderItem={renderListItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexWrap: 'wrap', width: '100%', marginTop: description ? 16 : 0 }}
            horizontal
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  expandableSectionStyle: {
    paddingHorizontal: 12,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surface.opacity
  },
  expandableSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16
  },
  aditionalTitleStyle: { lineHeight: 24 },
  aditionalDescriptionStyle: { lineHeight: 18},
  hiddenSection: { paddingVertical: 12, position: 'absolute', marginTop: 56 }
})

export default ExpandableSection
