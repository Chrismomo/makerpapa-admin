var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Activity Model
 * ==========
 */

var Activity = new keystone.List('Activity', {
	label: '活动',
	path: '3.activity',
	singular: '活动',
	schema :  { collection: '3.activity' },
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Activity.add({
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

Activity.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Activity.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Activity.register();
