/*
 * JavaScript (jQuery) file for personal website project.
 * Implements tab switching and various dynamic effects as required by the assignment.
 */

$(document).ready(function() {
    // Tab switching logic
    $('.menu-item').on('click', function() {
        var target = $(this).data('target');
        // Highlight the selected menu item
        $('.menu-item').removeClass('active');
        $(this).addClass('active');
        // Show the corresponding tab content
        $('.tab-content').removeClass('active');
        $('#' + target).addClass('active');
        // Fade in project cards if Work tab is selected
        if (target === 'work-section' && !$('#work-section').data('loaded')) {
            $('#work-section').data('loaded', true);
            $('#work-section .project-card').each(function (idx) {
                $(this).delay(200 * idx).fadeIn(500);
            });
        }
        if (target === 'about-section') {
            animateSkills();
        }
    });

    // Hide project cards initially
    $('#work-section .project-card').hide();

    // Slide toggle for project details
    $('.details-button').on('click', function() {
        var btn = $(this);
        var panel = btn.siblings('.details');
        panel.slideToggle(200, function() {
            var isVisible = panel.is(':visible');
            btn.attr('aria-expanded', isVisible);
            panel.attr('aria-hidden', !isVisible);
        });
    });


    // Tooltip creation on hover
    $('.project-image').hover(function(event) {
        // Create tooltip element
        var tooltip = $('<div class="tooltip"></div>').text('Click the image to animate');
        $('body').append(tooltip);
        // Position tooltip near the cursor
        tooltip.css({
            top: event.pageY + 10 + 'px',
            left: event.pageX + 10 + 'px'
        }).fadeIn(200);
        // Update tooltip position as the mouse moves
        $(this).on('mousemove', function(e) {
            tooltip.css({
                top: e.pageY + 10 + 'px',
                left: e.pageX + 10 + 'px'
            });
        });
    }, function() {
        // Remove tooltip when mouse leaves the image
        $('.tooltip').remove();
    });

    // Animate image width on click (toggle effect)
    $('.project-image').on('click', function() {
        var img = $(this);
        // Save original width for reset
        var originalWidth = img.width();
        img.animate({
            width: originalWidth * 0.8
        }, 300).animate({
            width: originalWidth
        }, 300);
    });

    // Theme toggle
    $('#theme-toggle').on('click', function() {
        $('body').toggleClass('dark');
        var dark = $('body').hasClass('dark');
        $(this).attr('aria-pressed', dark).text(dark ? 'Light Mode' : 'Dark Mode');
    });

    // Project search filter
    $('#project-search').on('input', function(){
        var q = $(this).val().toLowerCase();
        $('#work-section .project-card').each(function(){
            var text = $(this).text().toLowerCase();
            $(this).toggle(text.indexOf(q) !== -1);
        });
    });

    // Scroll reveal (applies to project cards and sections if reveal class is added)
    $('#work-section .project-card').addClass('reveal');
    function doReveal(){
        $('.reveal').each(function(){
            var rect = this.getBoundingClientRect();
            if(rect.top < window.innerHeight - 60){
                $(this).addClass('visible');
            }
        });
    }
    $(window).on('scroll', doReveal);
    doReveal();

    function animateSkills(){
        $('#about-section .skill').each(function(){
            var skill = $(this);
            if(skill.hasClass('animated')) return;
            var level = skill.data('level');
            skill.addClass('animated');
            skill.find('.fill').css('width', level + '%');
        });
    }

    // If user loads directly into about section (future deep link)
    if($('#about-section').hasClass('active')) animateSkills();

    // Auto-open details panels marked auto-show after first reveal
    $('.details.auto-show').each(function(){
        var panel = $(this);
        panel.parent().addClass('auto-details');
    });

    // Simple contact form demo validation
    $('#contact-form').on('submit', function(e){
        e.preventDefault();
        var name = $('#cf-name').val().trim();
        var email = $('#cf-email').val().trim();
        var msg = $('#cf-msg').val().trim();
        var status = $('#form-status');
        if(!name || !email || !msg){
            status.text('Please fill in all fields.');
            return;
        }
        // Fake async submit
        status.text('Sending...');
        setTimeout(function(){
            status.text('Message sent (demo only). Thank you!');
            $('#contact-form')[0].reset();
        }, 700);
    });

    // Smooth scroll Back to Top
    $('.jump-top').on('click', function(e){
        // Allow anchor default focus change but override abrupt jump
        e.preventDefault();
        window.scrollTo({top:0, behavior:'smooth'});
        // Also ensure first focusable element near top gets focus for accessibility
        setTimeout(function(){
            $('#top h1').attr('tabindex','-1').focus();
        }, 400);
    });
});