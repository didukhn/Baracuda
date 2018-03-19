jQuery(document).ready(function () {
  /**
   * Swiper
   */
  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 5000,
    },
  });

  /**
   * Nice select
   */
  jQuery('select').niceSelect();

  /**
   * Nice select hasn't placeholder. Fix for this issue
   */
  jQuery('select').on('change', function () {
    var target = $(this);
    if (target.find('option:first-child:selected').length > 0) {
      target.next('.styled-select').find('.current').css('color', '#BEBEBE');

    } else {
      target.next('.styled-select').find('.current').css('color', '');
    }
  });
  jQuery('select').trigger('change');

  /**
   * inputs type=date have height 2px more. Fix for this
   */
  jQuery('input[type="date"]').each(function () {
    var target = $(this);
    target.attr('type', 'text');
    var h = target.outerHeight();
    target.attr('type', 'date');
    target.css({ height: h });
  });

  /**
   * jQuery datepicker if embeded datepicker is not supported
   */
  if (jQuery('[type="date"]').prop('type') != 'date') {
    jQuery('[type="date"]').datepicker();
  }

  /**
   * Close all dropdown
   */
  jQuery('html, body').on('click', function () {
    $('.dropdown-content').height(0);
  });

  /**
   * For height:auto transition does not work.
   * We need to get this height before show dropdown to user.
   */
  jQuery('.main-menu li').on('click', function () {
    var target = jQuery(this);
    var dropdownContent = target.children('.dropdown-content');
    if (dropdownContent.height() > 0) {
      dropdownContent.height(0);
      return;
    }
    var parent = target.parent();

    for (const e of parent.children()) {
      if (e == this) {
        continue;
      }
      jQuery(e).removeClass('show-drop');
      jQuery(e).children('.dropdown-content').height(0);
    }


    var activeHeight = dropdownContent.css('height', 'auto').height();
    dropdownContent.height(0);

    target.toggleClass('show-drop');

    dropdownContent.height(activeHeight);

    return false;
  });

});
