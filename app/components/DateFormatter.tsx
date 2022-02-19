import { format, parse } from 'date-fns'

interface DateFormatterProps {
  dateString: string
}

const DateFormatter: React.FC<DateFormatterProps> = ({ dateString }) => {
  const date = parse(dateString, 'MMMM d, yyyy', new Date())
  return <time dateTime={dateString}>{format(date, 'LLLL do, yyyy')}</time>
}

export default DateFormatter
