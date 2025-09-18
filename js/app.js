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
        var container = $('#about-section');
        if(!container.length) return;
        container.find('.skill').each(function(){
            var skill = $(this);
            skill.removeClass('animated');
            var fill = skill.find('.fill');
            fill.stop(true).css('width','0');
            // Ensure pct span exists
            var pct = skill.find('.pct');
            if(!pct.length){
                pct = $('<span class="pct" aria-hidden="true">0%</span>');
                skill.append(pct);
            } else {
                pct.text('0%');
            }
        });
        container.find('.skill').each(function(i){
            var skill = $(this);
            var level = skill.data('level');
            var fill = skill.find('.fill');
            var pct = skill.find('.pct');
            skill.addClass('animated');
            setTimeout(function(){
                var duration = 1000;
                var start = performance.now();
                function step(ts){
                    var p = Math.min((ts - start)/duration, 1);
                    var val = Math.round(p * level);
                    fill.css('width', val + '%');
                    pct.text(val + '%');
                    if(p < 1){ requestAnimationFrame(step); }
                }
                requestAnimationFrame(step);
            }, i * 180);
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

    // Typewriter effect for intro text
    (function(){
        var el = $('#intro-typer');
        if(!el.length) return; // safety
        if(el.data('typed')) return; // prevent double typing if tab switches
        el.data('typed', true);
        var full = el.data('text');
        var idx = 0;
        el.addClass('caret');
        function typeNext(){
            if(idx <= full.length){
                el.text(full.substring(0, idx));
                idx++;
                setTimeout(typeNext, idx < 30 ? 40 : 18); // accelerate after first chars
            } else {
                el.removeClass('caret');
                // Highlight key tech words after completion
                var html = el.html()
                    .replace(/Python/g,'<span class="highlight">Python</span>')
                    .replace(/Django/g,'<span class="highlight">Django</span>')
                    .replace(/cloud computing/g,'<span class="highlight">cloud computing</span>');
                el.html(html);
                $('#intro-follow').removeClass('hidden').hide().fadeIn(600);
            }
        }
        setTimeout(typeNext, 400); // slight delay for nicer feel
    })();

    // Lightbox for diagram images
    const $lightbox = $('#lightbox');
    const $lightboxImg = $lightbox.find('.lightbox-img');
    const $lightboxClose = $lightbox.find('.lightbox-close');

    function openLightbox(src, alt) {
        $lightboxImg.attr('src', src);
        if (alt) $lightboxImg.attr('alt', alt);
        $lightbox.fadeIn(150).attr('aria-hidden', 'false');
        $('body').addClass('no-scroll');
        $lightboxClose.focus();
    }
    function closeLightbox() {
        $lightbox.fadeOut(150).attr('aria-hidden', 'true');
        $('body').removeClass('no-scroll');
    }

    // Click any image inside diagram gallery to open
    $('.diagram-gallery img').on('click', function() {
        const src = $(this).attr('src');
        const alt = $(this).attr('alt') || 'Expanded diagram';
        openLightbox(src, alt);
    });

    // Close actions
    $lightbox.on('click', function(e){
        if (e.target === this) closeLightbox();
    });
    $lightboxClose.on('click', closeLightbox);
    $(document).on('keydown', function(e){
        if (e.key === 'Escape' && $lightbox.is(':visible')) closeLightbox();
    });
});