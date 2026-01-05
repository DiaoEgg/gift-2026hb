// ===== 预加载背景音乐 =====
const bgMusic = document.getElementById('bgMusic');
if (bgMusic) {
    bgMusic.load();  // 页面打开时立即开始加载
}

// ===== 花瓣飘落效果 =====
function createPetals() {
    const container = document.getElementById('petals');
    const petals = ['🌸', '🌷', '💮', '🏵️', '✿', '❀'];
    
    for (let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
        petal.style.animationDelay = (Math.random() * 10) + 's';
        petal.style.fontSize = (Math.random() * 15 + 15) + 'px';
        container.appendChild(petal);
    }
}

// ===== 烟花效果 =====
class Firework {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];
        this.rockets = [];
        this.running = false;
    }

    start() {
        this.running = true;
        this.canvas.style.display = 'block';
        this.animate();
        
        // 持续发射烟花
        this.launchInterval = setInterval(() => {
            if (this.running) {
                this.launch();
            }
        }, 400);
        
        // 5秒后停止
        setTimeout(() => this.stop(), 5000);
    }

    stop() {
        this.running = false;
        clearInterval(this.launchInterval);
        setTimeout(() => {
            this.canvas.style.display = 'none';
            this.particles = [];
            this.rockets = [];
        }, 2000);
    }

    launch() {
        const x = Math.random() * this.canvas.width;
        const targetY = Math.random() * this.canvas.height * 0.5 + 50;
        
        this.rockets.push({
            x: x,
            y: this.canvas.height,
            targetY: targetY,
            speed: 8 + Math.random() * 4,
            color: this.getRandomColor()
        });
    }

    getRandomColor() {
        const colors = [
            '#ff69b4', '#ff1493', '#da70d6', '#ba55d3', 
            '#9370db', '#8a2be2', '#ffd700', '#ff6347',
            '#00ff7f', '#00ced1', '#ff4500', '#ff69b4'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    explode(x, y, color) {
        const particleCount = 80 + Math.floor(Math.random() * 40);
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = 2 + Math.random() * 4;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: color,
                alpha: 1,
                decay: 0.015 + Math.random() * 0.01,
                size: 2 + Math.random() * 2
            });
        }
    }

    animate() {
        if (!this.running && this.particles.length === 0 && this.rockets.length === 0) {
            return;
        }

        // 半透明覆盖，制造拖尾效果
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 更新火箭
        for (let i = this.rockets.length - 1; i >= 0; i--) {
            const rocket = this.rockets[i];
            rocket.y -= rocket.speed;

            // 绘制火箭尾迹
            this.ctx.beginPath();
            this.ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = rocket.color;
            this.ctx.fill();

            // 到达目标高度时爆炸
            if (rocket.y <= rocket.targetY) {
                this.explode(rocket.x, rocket.y, rocket.color);
                this.rockets.splice(i, 1);
            }
        }

        // 更新粒子
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // 重力
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
            this.ctx.fill();
        }

        requestAnimationFrame(() => this.animate());
    }
}

// ===== 主程序 =====
document.addEventListener('DOMContentLoaded', () => {
    createPetals();

    // 获取元素
    const welcome = document.getElementById('welcome');
    const cakeSection = document.getElementById('cakeSection');
    const gallery = document.getElementById('gallery');
    const message = document.getElementById('message');
    const ending = document.getElementById('ending');
    const startBtn = document.getElementById('startBtn');
    const cake = document.getElementById('cake');
    const blowHint = document.getElementById('blowHint');
    const flames = document.querySelectorAll('.flame');
    const replayBtn = document.getElementById('replayBtn');

    // 烟花初始化
    const fireworksCanvas = document.getElementById('fireworks');
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
    const ctx = fireworksCanvas.getContext('2d');
    const firework = new Firework(fireworksCanvas, ctx);

    // 窗口大小改变时调整画布
    window.addEventListener('resize', () => {
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    });

    // 点击开始按钮
    startBtn.addEventListener('click', () => {
        welcome.classList.add('hidden');
        cakeSection.classList.remove('hidden');
        cakeSection.scrollIntoView({ behavior: 'smooth' });
    });

    // 点击蛋糕吹蜡烛
    let candlesBlown = false;
    cake.addEventListener('click', () => {
        if (candlesBlown) return;
        candlesBlown = true;

        // 吹灭蜡烛
        flames.forEach((flame, index) => {
            setTimeout(() => {
                flame.classList.add('out');
            }, index * 200);
        });

        blowHint.textContent = '🎉 愿望一定会实现的！🎉';

        // 显示烟花文字 & 启动烟花
        const fireworkText = document.getElementById('fireworkText');
        setTimeout(() => {
            fireworkText.classList.remove('hidden');
            firework.start();
        }, 800);

        // 3秒后隐藏烟花文字
        setTimeout(() => {
            fireworkText.classList.add('hidden');
        }, 3800);

        // 烟花结束后，一次性展示所有内容，让用户自己滑动查看
        setTimeout(() => {
            cakeSection.classList.add('hidden');
            gallery.classList.remove('hidden');
            message.classList.remove('hidden');
            ending.classList.remove('hidden');
            gallery.scrollIntoView({ behavior: 'smooth' });
        }, 8000);
    });

    // 重新播放
    replayBtn.addEventListener('click', () => {
        // 重置所有状态
        candlesBlown = false;
        flames.forEach(flame => flame.classList.remove('out'));
        blowHint.textContent = '✨ 点击蛋糕许个愿，然后吹灭蜡烛吧 ✨';
        
        // 隐藏所有区域
        cakeSection.classList.add('hidden');
        gallery.classList.add('hidden');
        message.classList.add('hidden');
        ending.classList.add('hidden');
        
        // 显示欢迎
        welcome.classList.remove('hidden');
        welcome.scrollIntoView({ behavior: 'smooth' });
    });

    // ===== 心里话弹窗 =====
    const secretLink = document.getElementById('secretLink');
    const secretModal = document.getElementById('secretModal');
    const secretOverlay = document.getElementById('secretOverlay');
    const secretClose = document.getElementById('secretClose');

    // ===== 答题系统 =====
    const quizQuestions = [
        {
            question: "我们第一次有交集，可能是因为什么游戏？",
            options: ["真心话大冒险", "谁是卧底", "国王与天使", "狼人杀"],
            correct: 2,  // 国王与天使
            icon: "👼",
            memory: `<p>高一下学期，我们在七班成了同班同学。</p>
                     <p>说实话，第一次有交集是什么时候，我已经记不太清了。只记得有一次玩"国王与天使"的游戏，你是我的天使。</p>
                     <p>也许，就是从那时候开始，我们慢慢有了交集吧。</p>
                     <p>后来我们也有学习上的探讨，体育课上偶尔也会一起打乒乓球...</p>`
        },
        {
            question: "那时候早自习查校服很严，你曾经帮过我什么？",
            options: ["帮我遮挡", "借我外套", "幸灾乐祸", "没帮过"],
            correct: 1,  // 借我外套
            icon: "🧥",
            memory: `<p>那时候上早自习，查校服查得严。</p>
                     <p>有一次我忘了穿，你刚好在我身旁就把你的外套递给我。</p>
                     <p>那时候的单纯，真的很美好。</p>`
        },
        {
            question: "中秋前后的一次班会，我收到过你的礼物，你还记得吗？",
            options: ["一张贺卡", "一块月饼", "一颗糖", "没有的事"],
            correct: 1,  // 手工月饼
            icon: "🥮",
            memory: `<p>印象最深的是有一次班会，恰好在中秋前后，也恰好赶上我的生日，班主任给我过生日，带着我们做手工月饼。</p>
                     <p>你做了一个，送给了我。</p>
                     <p>我还记得当时自己特别害羞，接过来就一口闷了。虽然有点尴尬，但真的很开心。</p>`
        },
        {
            question: "后来我把你QQ删了，还记得说什么时候再加回来吗？",
            options: ["等放假的时候", "等考上大学", "等考进重点班", "等毕业以后"],
            correct: 2,  // 等考进重点班
            icon: "💬",
            memory: `<p>曾经意气风发的少年，突然有一天晚上抽风了，把你的QQ删了。</p>
                     <p>还信誓旦旦地说："等我考进重点班，再把你加回来。"</p>
                     <p>可后来，他也没能做到...</p>`
        }
    ];

    let currentQuiz = 0;
    const quizSection = document.getElementById('quizSection');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const quizFeedback = document.getElementById('quizFeedback');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const memorySection = document.getElementById('memorySection');
    const memoryIcon = document.getElementById('memoryIcon');
    const memoryText = document.getElementById('memoryText');
    const memoryNextBtn = document.getElementById('memoryNextBtn');
    const secretLetter = document.getElementById('secretLetter');

    // 渲染题目
    function renderQuiz() {
        const quiz = quizQuestions[currentQuiz];
        quizQuestion.textContent = quiz.question;
        quizOptions.innerHTML = '';
        quizFeedback.classList.add('hidden');
        
        // 更新进度
        progressText.textContent = `${currentQuiz + 1} / ${quizQuestions.length}`;
        progressFill.style.width = `${(currentQuiz / quizQuestions.length) * 100}%`;

        quiz.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = option;
            btn.addEventListener('click', () => checkAnswer(index, btn));
            quizOptions.appendChild(btn);
        });
    }

    // 检查答案
    function checkAnswer(selectedIndex, btn) {
        const quiz = quizQuestions[currentQuiz];
        const allOptions = quizOptions.querySelectorAll('.quiz-option');
        
        // 禁用所有选项
        allOptions.forEach(opt => opt.style.pointerEvents = 'none');

        if (selectedIndex === quiz.correct) {
            // 答对了
            btn.classList.add('correct');
            quizFeedback.classList.remove('hidden', 'wrong');
            quizFeedback.classList.add('correct');
            quizFeedback.querySelector('.feedback-icon').textContent = '✓';
            quizFeedback.querySelector('.feedback-text').textContent = '你还记得...';

            // 显示回忆场景
            setTimeout(() => {
                showMemory(quiz);
            }, 1000);
        } else {
            // 答错了
            btn.classList.add('wrong');
            quizFeedback.classList.remove('hidden', 'correct');
            quizFeedback.classList.add('wrong');
            quizFeedback.querySelector('.feedback-icon').textContent = '✗';
            quizFeedback.querySelector('.feedback-text').textContent = '再想想~';

            // 1.5秒后重新启用选项
            setTimeout(() => {
                btn.classList.remove('wrong');
                quizFeedback.classList.add('hidden');
                allOptions.forEach(opt => opt.style.pointerEvents = '');
            }, 1500);
        }
    }

    // 显示回忆场景
    function showMemory(quiz) {
        quizSection.classList.add('completed');
        
        setTimeout(() => {
            quizSection.classList.add('hidden');
            quizSection.classList.remove('completed');
            
            memoryIcon.textContent = quiz.icon;
            memoryText.innerHTML = quiz.memory;
            
            // 判断是否是最后一题
            if (currentQuiz >= quizQuestions.length - 1) {
                memoryNextBtn.textContent = '看看他想说什么 →';
            } else {
                memoryNextBtn.textContent = '继续 →';
            }
            
            memorySection.classList.remove('hidden', 'completed');
        }, 500);
    }

    // 点击继续按钮
    memoryNextBtn.addEventListener('click', () => {
        currentQuiz++;
        
        if (currentQuiz < quizQuestions.length) {
            // 还有题目，显示下一题
            memorySection.classList.add('completed');
            setTimeout(() => {
                memorySection.classList.add('hidden');
                quizSection.classList.remove('hidden');
                renderQuiz();
            }, 500);
        } else {
            // 全部答对，显示心里话
            showSecretLetter();
        }
    });

    // 显示心里话
    function showSecretLetter() {
        progressFill.style.width = '100%';
        memorySection.classList.add('completed');
        
        setTimeout(() => {
            memorySection.classList.add('hidden');
            secretLetter.classList.remove('hidden');
            secretLetter.classList.add('reveal');
        }, 500);
    }

    // ===== 入口验证 =====
    const gateSection = document.getElementById('gateSection');
    const gateInput = document.getElementById('gateInput');
    const gateSubmit = document.getElementById('gateSubmit');
    const gateFeedback = document.getElementById('gateFeedback');
    const lyricSection = document.getElementById('lyricSection');
    const lyricContinue = document.getElementById('lyricContinue');

    // 验证歌曲名
    function checkGate() {
        const answer = gateInput.value.trim();
        if (answer === '讲你知') {
            // 答对了，显示歌词页面
            gateSection.classList.add('completed');
            setTimeout(() => {
                gateSection.classList.add('hidden');
                lyricSection.classList.remove('hidden');
            }, 500);
        } else {
            // 答错了
            gateFeedback.classList.remove('hidden');
            gateInput.classList.add('shake');
            setTimeout(() => {
                gateInput.classList.remove('shake');
            }, 500);
        }
    }

    gateSubmit.addEventListener('click', checkGate);
    gateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGate();
        }
    });

    // 歌词页面点击继续
    lyricContinue.addEventListener('click', () => {
        lyricSection.classList.add('completed');
        setTimeout(() => {
            lyricSection.classList.add('hidden');
            quizSection.classList.remove('hidden');
            renderQuiz();
        }, 500);
    });

    // 点击入口打开弹窗
    secretLink.addEventListener('click', () => {
        secretModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        // 播放背景音乐
        bgMusic.play().catch(() => {});  // 忽略自动播放限制错误
        // 重置所有状态
        currentQuiz = 0;
        gateSection.classList.remove('hidden', 'completed');
        gateInput.value = '';
        gateFeedback.classList.add('hidden');
        lyricSection.classList.add('hidden');
        lyricSection.classList.remove('completed');
        quizSection.classList.add('hidden');
        quizSection.classList.remove('completed');
        memorySection.classList.add('hidden');
        memorySection.classList.remove('completed');
        secretLetter.classList.add('hidden');
        secretLetter.classList.remove('reveal');
    });

    // 关闭弹窗
    function closeSecret() {
        secretModal.classList.add('hidden');
        document.body.style.overflow = '';
        // 停止音乐
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }

    secretClose.addEventListener('click', closeSecret);
    secretOverlay.addEventListener('click', closeSecret);

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !secretModal.classList.contains('hidden')) {
            closeSecret();
        }
    });
});

