import React from 'react';

type Name = {
	name: string;
};

export default function Test({ name }: Name) {
	return <div>Test {name}</div>;
}
