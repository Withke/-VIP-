# -VIP-
基于VIP解析网站的衍生拓展，可以在拓展里选择视频平台与解析网站
这次的项目是一个浏览器扩展，用于解析视频网址。
目前测试，适配edge和Chrome浏览器。

食用方式：
1.点击edge浏览器右上角

<img width="780" height="506" alt="image" src="https://github.com/user-attachments/assets/846f0919-14b1-470b-bb16-195072d0e2fe" />

2.打开开发者选项

<img width="331" height="524" alt="image" src="https://github.com/user-attachments/assets/58300e99-0d97-48f4-a950-21e640c9e975" />

3.在这里把解压后的文件夹选中

<img width="197" height="40" alt="image" src="https://github.com/user-attachments/assets/b804b2bc-a8c1-49e2-8d2b-dc089bf5ccf0" />

4.开启扩展，点击视频解析助手

<img width="473" height="355" alt="image" src="https://github.com/user-attachments/assets/0324af60-7673-4877-8e92-060579f67ef7" />

5.选择你想看平台，进去选择电视或者电影

<img width="400" height="493" alt="image" src="https://github.com/user-attachments/assets/82cda9b0-e2bd-4d34-9798-8ed402d8e9e0" />

6.开始看广告的时候点击解析当页

<img width="1920" height="932" alt="image" src="https://github.com/user-attachments/assets/0d0968f6-938a-4f7e-9928-7e4c5ab0f8de" />

代码已上传，可以自行添加修改观影源与平台


具体需求是实现在edge浏览器中，点击扩展图标后，弹出一个窗口，有一个视频平台选择，一个解析按钮和一个切换按钮。

注意事项：
解析按钮用于解析视频网址，切换按钮用于切换解析线路，视频平台选择用于选择观影源的选择。
默认解析线路：首次使用时未选择线路，切换按钮应自动选中“线路1”，避免用户卡在无线路状态。
选择平台后扩展自动打开对应网站。
为减少误触，自动打开后弹窗关闭

观影源：
    1.爱奇艺https://www.iqiyi.com/
    2.优酷https://www.youku.com/
    3.腾讯https://v.qq.com/

解析线路1https://www.yemu.xyz/?url=
解析线路2http://8.134.102.170:8000/play?url=


原理：
    假设视频网址是123
    则解析线路为https://www.yemu.xyz/?url=123
    直接跳转https://www.yemu.xyz/?url=123网页

具体实现功能是：
    用户点击扩展图标后，弹出一个窗口，有一个视频平台选择，一个解析按钮和一个切换按钮。
    用户先点击视频平台选择，选择观影源。
    再选择自己想看的电影或者电视，进入试看，这是的网址就是视频的网址。
    点击切换按钮后，切换解析线路（如果用户没有选择路线则弹出提示）。
    用户此时点击解析按钮，扩展自动获取当前视频网址。
    根据当前解析线路，跳转对应的解析网页（解析网页是由解析线路和视频网址拼接而成）。
制作者，精神八爪鱼
   
