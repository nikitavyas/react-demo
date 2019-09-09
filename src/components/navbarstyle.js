import { Theme } from '@material-ui/core'
import { fade,makeStyles } from '@material-ui/core/styles';

const style = makeStyles(theme => ({
  
  grow: {
    marginRight: 50,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
})); export default style;