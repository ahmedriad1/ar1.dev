import { format, parse } from 'date-fns'

const DateFormatter: React.FC<{ dateString: string }> = ({ dateString }) => {
  const date = parse(dateString, 'MMMM d, yyyy', new Date())
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export default DateFormatter
