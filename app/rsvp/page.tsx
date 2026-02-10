import Card from "../_components/card";
import Grid from "../_components/grid";

interface IRSVP {}

const RSVP = (props: IRSVP) => {
	return (
		<div>
			<Grid cards={[<Card />, <Card />, <Card />, <Card />, <Card />, <Card />, <Card />]}></Grid>
		</div>
	);
};
export default RSVP;
