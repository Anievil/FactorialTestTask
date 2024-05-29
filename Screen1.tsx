import { StatusBar } from 'expo-status-bar'
import { FlatList, ListRenderItem, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors } from './ds/colors'
import { Text } from './ds/components/Text'
import ExpandableSection, { ExpandableSectionProps } from './ds/components/ExpandableSection'
import mockedData from './data/mock.json'
import { useCallback, useMemo } from 'react'

export const Screen1: React.FC<{}> = () => {
  const insets = useSafeAreaInsets()
  const mockedList = useMemo(() => Object.values(mockedData), [mockedData])
  const setKeyExtractor = useCallback(
    (item: ExpandableSectionProps, index: number) => item.title + index,
    []
  )
  const renderListItem: ListRenderItem<ExpandableSectionProps> = useCallback(
    ({ item: { title, description, tags } }) => (
      <ExpandableSection title={title} description={description} tags={tags} />
    ),
    []
  )

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface.primary,
        paddingHorizontal: 16
      }}
    >
      <StatusBar style='light' />
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom
        }}
      >
        <Text typeface='H4'>Hello</Text>
        <FlatList
          data={mockedList}
          keyExtractor={setKeyExtractor}
          renderItem={renderListItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}
