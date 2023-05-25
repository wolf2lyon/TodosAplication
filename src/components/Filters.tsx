import { FILTERS_BUTTONS } from '../consts'
import { type FileterValue } from '../types'

interface Props {
  onFilterChange: (filter: FileterValue) => void
  filterSelected: FileterValue
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  return (
        <ul className="filters">
           {
            Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
              const isSelected = key === filterSelected
              const className = isSelected ? 'selected' : ''
              return (
                    <li key={key}>
                        <a
                        href={href}
                        className={className}
                        onClick={(event) => {
                          event.preventDefault()
                          onFilterChange(key as FileterValue)
                        }}>
                            {literal}
                        </a>
                    </li>
              )
            })
           }
        </ul>
  )
}
