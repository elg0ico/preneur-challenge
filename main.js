document.addEventListener('alpine:init', () => {
  window.threadsApp = function() {
    return {
      isModalOpen: false,
      newThreadContent: '',
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      maxThreadLength: 280,
      threads: [
        {
          id: 3,
          author: 'Alice Johnson',
          content: 'Just finished reading an amazing book about AI ethics. So many thought-provoking ideas about our digital future!',
          timestamp: new Date(new Date().getTime() - 5 * 60 * 60 * 1000),
          likes: 24,
          comments: 8,
          liked: false,
          isNew: false
        },
        {
          id: 2,
          author: 'Sam Rodriguez',
          content: 'Working on a new music project. Can\'t wait to share it with everyone soon. Stay tuned!',
          timestamp: new Date(new Date().getTime() - 12 * 60 * 60 * 1000),
          likes: 87,
          comments: 15,
          liked: true,
          isNew: false
        },
        {
          id: 1,
          author: 'Taylor Chen',
          content: 'Beautiful day for hiking! The trails are gorgeous this time of year. 🌲🏞️',
          timestamp: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          likes: 132,
          comments: 24,
          liked: false,
          isNew: false
        }
      ],

      get threadCount() {
        return this.threads.length;
      },

      get isThreadContentValid() {
        return this.newThreadContent.trim().length > 0 && 
               this.newThreadContent.length <= this.maxThreadLength;
      },

      formatTime(timestamp) {
        const now = new Date();
        const diff = Math.floor((now - timestamp) / 1000);
        
        if (diff < 60) {
          return 'Just now';
        } else if (diff < 3600) {
          const minutes = Math.floor(diff / 60);
          return `${minutes}m ago`;
        } else if (diff < 86400) {
          const hours = Math.floor(diff / 3600);
          return `${hours}h ago`;
        } else {
          return timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
      },
      
      getAvatarColor(author) {
        const colors = [
          'from-pink-500 to-red-500',
          'from-purple-500 to-indigo-500',
          'from-green-500 to-teal-500',
          'from-blue-500 to-cyan-500',
          'from-yellow-500 to-orange-500'
        ];
        
        let hash = 0;
        for (let i = 0; i < author.length; i++) {
          hash = author.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        return colors[Math.abs(hash) % colors.length];
      },
      
      likeThread(thread, event) {
        const heartIcon = event.currentTarget.querySelector('.heart-icon');
        if (heartIcon) {
          heartIcon.classList.add('animate-heart-beat');
          setTimeout(() => {
            heartIcon.classList.remove('animate-heart-beat');
          }, 300);
        }

        if (thread.liked) {
          thread.likes--;
          thread.liked = false;
        } else {
          thread.likes++;
          thread.liked = true;
        }
      },
      
      openNewThreadModal(event) {
        console.log('Opening modal');
        this.isModalOpen = true;
        this.newThreadContent = '';
        
        this.$nextTick(() => {
          if (this.$refs.threadContent) {
            this.$refs.threadContent.focus();
          }
        });
      },
      
      closeModal() {
        console.log('Closing modal');
        this.isModalOpen = false;
        this.newThreadContent = '';
      },
      
      showSuccessToast(message = 'Thread posted successfully!') {
        this.toastMessage = message;
        this.toastType = 'success';
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      },
      
      showErrorToast(message) {
        this.toastMessage = message;
        this.toastType = 'error';
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      },
      
      postNewThread() {
        if (!this.isThreadContentValid) {
          if (this.newThreadContent.length > this.maxThreadLength) {
            this.showErrorToast('Thread content exceeds maximum length');
          } else {
            this.showErrorToast('Thread content cannot be empty');
          }
          return;
        }
        
        try {
          const newThread = {
            id: Date.now(),
            author: 'You',
            content: this.newThreadContent.trim(),
            timestamp: new Date(),
            likes: 0,
            comments: 0,
            liked: false,
            isNew: true
          };
          
          this.closeModal();
          this.showSuccessToast();
          this.threads.unshift(newThread);
          
          this.$nextTick(() => {
            const threadElement = document.getElementById(`thread-${newThread.id}`);
            if (threadElement) {
              threadElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
              
              const contentElement = threadElement.querySelector('.thread-content');
              if (contentElement) {
                setTimeout(() => {
                  contentElement.classList.add('visible');
                }, 100);
              }
            }
          });
          
          setTimeout(() => {
            newThread.isNew = false;
          }, 3000);
        } catch (error) {
          console.error('Error posting thread:', error);
          this.showErrorToast('Failed to post thread. Please try again.');
        }
      },

      initThreads() {
        this.$nextTick(() => {
          const threadElements = document.querySelectorAll('.thread-content');
          threadElements.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add('visible');
            }, index * 100);
          });
        });
      }
    };
  }
});

document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 160,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 4,
          "size_min": 0.3,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 600
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 250,
          "size": 0,
          "duration": 2,
          "opacity": 0,
          "speed": 3
        },
        "repulse": {
          "distance": 400,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
}); 