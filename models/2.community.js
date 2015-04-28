var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Community Model
 * ==========
 */

var Community = new keystone.List('Community', {
	label: '社区',
	path: '2.community',
	singular: '社区',
	schema :  { collection: '2.community' },
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Community.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

Community.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Community.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Community.register();