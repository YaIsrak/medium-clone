export interface Post {
	_id: string;
	_createdAt: string;
	title: string;
	author: {
		name: string;
		image: string;
	};
	comment: TypeComment[];
	mainImage: {
		asset: {
			url: string;
		};
	};
	slug: {
		current: string;
	};
	body: [object];
}

export interface TypeComment {
	_id: string;
	_createdAt: string;
	_rev: string;
	_updatedAt: string;
	approved: boolean;
	email: string;
	comment: string;
	name: string;
	post: {
		_ref: string;
		_type: string;
	};
}
