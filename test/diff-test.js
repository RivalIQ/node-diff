var vows = require('vows')
  , diff = require('../diff')
  , assert = require('assert');
  
vows.describe('Diff Tests').addBatch({
	'see that it works': {
		topic: function() {
			return diff(
				'The red brown fox jumped over the rolling log.',
   				'The brown spotted fox leaped over the rolling log'
   			);
		},
		'as expected': function(topic) {
			assert.equal(topic, ' The <del>red </del> brown <ins>spotted </ins> fox <del>jumped </del><ins>leaped </ins> over  the  rolling <del>log.</del><ins>log</ins>');
		}
	},
    'with custom insert markup': {
        topic: function() {
            return diff(
                'The red brown fox jumped over the rolling log.',
                'The brown spotted fox leaped over the rolling log',
                function () { return '$TEST$'; }
            );
        },
        'as expected': function(topic) {
            assert.equal(topic, ' The <del>red </del> brown $TEST$ fox <del>jumped </del>$TEST$ over  the  rolling <del>log.</del>$TEST$');
        }
    },
    'with custom delete markup': {
        topic: function() {
            return diff(
                'The red brown fox jumped over the rolling log.',
                'The brown spotted fox leaped over the rolling log',
                null,
                function () { return '$TEST$'; }
            );
        },
        'as expected': function(topic) {
            assert.equal(topic, ' The $TEST$ brown <ins>spotted </ins> fox $TEST$<ins>leaped </ins> over  the  rolling $TEST$<ins>log</ins>');
        }
    },
    'with custom insert and delete markup': {
        topic: function() {
            return diff(
                'The red brown fox jumped over the rolling log.',
                'The brown spotted fox leaped over the rolling log',
                function () { return '$INSERT$'; },
                function () { return '$DELETE$'; }
            );
        },
        'as expected': function(topic) {
            assert.equal(topic, ' The $DELETE$ brown $INSERT$ fox $DELETE$$INSERT$ over  the  rolling $DELETE$$INSERT$');
        }
    }
}).export(module);
