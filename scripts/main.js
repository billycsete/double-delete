(function () {
	"use strict";

	var DoubleDelete = function(element) {
		this.$element = $(element);
		this.$icon = this.$element.children('.icon');
		this.$message = this.$element.children('.message');

		this.init();
	}

	DoubleDelete.prototype = {
		init : function() {
			var self = this;

			this.$icon.on('mouseenter', function() {
				self.toggleMessage();
			});

			this.$icon.on('mouseleave', function() {
				if (self.$element.hasClass('finished')){
					self.toggleMessage();
				} else {
					self.toggleMessage();
					self.$message.html('Delete');
					self.$element.removeClass('check');
					self.$element.removeClass('double-check');
					self.$element.addClass('default');
				}
			});

			this.$icon.on('click', function() {
				self.doubleCheck();
			});
		},

		toggleMessage : function() {
			this.$element.toggleClass('show');
		},

		doubleCheck : function() {
			var self = this;

			if (this.$element.hasClass('default')) {
				self.$message.html('Are you sure?');
				self.$element.removeClass('default');
				self.$element.addClass('check');
			}
			else if (this.$element.hasClass('check')) {
				self.$message.html('Deleted');
				self.$element.removeClass('check');
				self.$element.addClass('double-check');
				self.$element.addClass('finished');
				self.$icon.removeClass('foundicon-trash');
				self.$icon.addClass('foundicon-checkmark');
			}
		}
	}

	window.DoubleDelete = DoubleDelete;
})();


$(document).ready( function(){
	$('.double-delete').each(function(){
		new DoubleDelete(this);
	});
});