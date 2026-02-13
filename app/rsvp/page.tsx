import Ceremony from "../_cards/ceremony";
import DressCode from "../_cards/dress_code";
import TCard from "../_components/card";
import Grid from "../_components/grid";

interface IRSVP {}

const RSVP = (props: IRSVP) => {
	return (
		<div>
			<Grid
				cards={[
					<TCard>
						<Ceremony />
					</TCard>,
					<TCard>
						<DressCode />
					</TCard>,
					<TCard />,
					<TCard />,
					<TCard />,
					<TCard />,
					<TCard />,
				]}></Grid>
		</div>
	);
};
export default RSVP;
