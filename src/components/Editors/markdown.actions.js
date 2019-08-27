import TitleIcon from 'react-feather/dist/icons/type'
import BoldIcon from 'react-feather/dist/icons/bold'
import ItalicIcon from 'react-feather/dist/icons/italic'
import QuoteIcon from 'react-feather/dist/icons/message-circle'
import CodeIcon from 'react-feather/dist/icons/code'
import LinkIcon from 'react-feather/dist/icons/link-2'
import ListIcon from 'react-feather/dist/icons/list'
import HashIcon from 'react-feather/dist/icons/hash'

export default [
  {
    name: 'title',
    icon: TitleIcon,
    chars: ['### '],
  },
  {
    name: 'bold',
    icon: BoldIcon,
    chars: ['**', '**'],
    key: 'b',
  },
  {
    name: 'italic',
    icon: ItalicIcon,
    chars: ['_', '_'],
    key: 'i',
  },
  {
    name: 'quote',
    icon: QuoteIcon,
    chars: ['\n\n> '],
  },
  {
    name: 'code',
    icon: CodeIcon,
    chars: ['`', '`'],
    charsBlock: ['\n```\n', '\n```\n'],
  },
  {
    name: 'link',
    icon: LinkIcon,
    chars: ['[', '](url)'],
  },
  {
    name: 'bullet',
    icon: ListIcon,
    chars: ['\n- '],
  },
  {
    name: 'numbers',
    icon: HashIcon,
    chars: ['\n-1.'],
  },
]
