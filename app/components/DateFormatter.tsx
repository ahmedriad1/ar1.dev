import { format, parse } from 'date-fns'

interface DateFormatterProps {
  dateString: string
}

const DateFormatter: React.FC<DateFormatterProps> = ({ dateString }) => {
  const date = parse(dateString, 'MMMM d, yyyy', new Date())
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export default DateFormatter
