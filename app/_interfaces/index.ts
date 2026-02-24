export type Invitation = {
	Name1: string | null;
	Name2: string | null;
	LastName1: string | null;
	LastName2: string | null;
	Restrictions1: string | null;
	Restrictions2: string | null;
	Confirm1: boolean | undefined;
	Confirm2: boolean | undefined;
	CC1: string | null;
	CC2: string | null;
	index: number;
};

export type Question = {
	askedBy: string;
	question: string;
	index: number;
};

export type GiftMessage = {
	author: string;
	message: string;
	index: number;
	likes: number;
};
