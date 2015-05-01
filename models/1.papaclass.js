var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * PapaClass Model
 * ==========
 */

var PapaClass = new keystone.List('PapaClass', {
	label: '课程',
	path: '1.papaclass',
	singular: '课程',
	schema :  { collection: '1.papaclass' },
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

PapaClass.add({
	title: { type: String, required: true },
	image: { type: String },
	participators: { type: Types.TextArray },
	blog: { type: String},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

PapaClass.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

PapaClass.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
PapaClass.register();
