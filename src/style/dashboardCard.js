
import { red } from '@material-ui/core/colors';

function dashboardCard(theme) {
    let dashboardCard = {
        root: {
            maxWidth: 345,
            height: 275
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }
    return dashboardCard
}

export default dashboardCard
