import { StreamsType } from '../store/streams/streamsTypes'
import { GroupLoadStreamType } from '../store/groups/groupsTypes'

interface IgetLessonRemarkProps {
  stream: GroupLoadStreamType | StreamsType | null
  subgroupNumber: number | null
  type: 'ЛК' | 'ПЗ' | 'ЛАБ' | 'СЕМ' | 'ЕКЗ' | 'КОНС' | 'МЕТОД'
  specialization: string | null
}

const getLessonRemark = ({ stream, subgroupNumber, type, specialization }: IgetLessonRemarkProps): string => {
  const streamName = stream ? ` ⋅ ${stream.name}` : ''
  const subgroup = subgroupNumber ? ` ⋅ п.${subgroupNumber}` : ''
  const spec = specialization ? ` ⋅ ${specialization} спец. ` : ''
  const remark = type + streamName + spec + subgroup

  return remark
}

export { getLessonRemark }
