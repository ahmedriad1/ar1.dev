import { format, parse } from 'date-fns'

interface DateFormatProps {
  dateString: string
}

const DateFormatter: React.FC<DateFormatProps> = ({ dateString }) => {
  const date = parse(dateString, 'MMMM d, yyyy', new Date())
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export default DateFormatter
