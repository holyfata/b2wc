/**
 * 构建脚本 - 打包应用程序
 * 
 * 该脚本用于将多个子应用（Vue、React、Vanilla）打包到一个统一的dist目录中，
 * 并修改主HTML文件中的路径引用，使其指向本地文件而非开发服务器。
 * 
 * 主要功能：
 * 1. 创建/清理dist目录
 * 2. 修改HTML文件中的路径引用
 * 3. 复制各个子应用的dist目录到主dist目录
 * 
 * 执行流程：
 * 1. 删除已存在的dist目录（如有）并创建新的dist目录
 * 2. 读取并修改index.html中的路径引用
 * 3. 将修改后的HTML内容写入dist目录
 * 4. 复制各个子应用的dist目录到主dist目录
 */

import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 主函数包装所有操作，提供统一的错误处理
async function build() {
    try {
        // 创建dist文件夹(如果已存在则删除)
        const distPath = path.join(__dirname, 'dist')
        if (fs.existsSync(distPath)) {
            await fs.promises.rm(distPath, { recursive: true, force: true })
        }
        
        await fs.promises.mkdir(distPath, { recursive: true })
        console.log('✅ 创建dist目录成功')
        
        try {
            // 读取并修改HTML文件
            const htmlPath = path.join(__dirname, 'index.html')
            const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
                .replace('http://localhost:3001/', './vue-app/index.html')
                .replace('http://localhost:3003/', './react-app/index.html')
                .replace('http://localhost:3002/', './vanilla-app/index.html')
            fs.writeFileSync(path.join(distPath, 'index.html'), htmlContent)
            console.log('✅ HTML文件处理成功')
        } catch (err) {
            console.error('❌ HTML文件处理失败:', err.message)
            throw new Error('构建过程中断: HTML文件处理失败')
        }
        
        // 定义需要复制的应用列表
        const apps = [
            { name: 'vue-app', source: './vue-app/dist', target: './dist/vue-app' },
            { name: 'react-app', source: './react-app/dist', target: './dist/react-app' },
            { name: 'vanilla-app', source: './vanilla-app/dist', target: './dist/vanilla-app' }
        ]
        
        // 复制所有应用的dist目录到主dist目录
        let copyErrors = 0
        for (const app of apps) {
            try {
                await copyFolder(
                    path.join(__dirname, app.source),
                    path.join(__dirname, app.target)
                )
                console.log(`✅ 成功复制 ${app.name} 应用`)
            } catch (err) {
                console.error(`❌ 复制 ${app.name} 应用失败:`, err.message)
                copyErrors++
            }
        }
        
        if (copyErrors > 0) {
            console.warn(`⚠️ 构建完成，但有 ${copyErrors} 个应用复制失败`)
        } else {
            console.log('🎉 构建成功完成！所有应用已复制')
        }
    } catch (err) {
        console.error('❌ 构建失败:', err.message)
        process.exit(1)
    }
}

// 执行构建
build().catch(err => {
    console.error('❌ 未处理的错误:', err)
    process.exit(1)
})

/**
 * 复制文件夹（递归复制所有子文件和子文件夹）
 * 
 * 该函数将源文件夹中的所有内容（包括子文件夹和文件）复制到目标文件夹。
 * 如果目标文件夹不存在，会自动创建。
 * 
 * @param source 源文件夹路径 - 必须是一个存在的目录
 * @param destination 目标文件夹路径 - 如果不存在会自动创建
 * @param overwrite 是否覆盖已存在的文件（默认true）
 * @returns {Promise<void>} 复制完成后的Promise
 * @throws {Error} 当源文件夹不存在或复制过程中出错时抛出异常
 */
async function copyFolder(source: string, destination: string, overwrite = true): Promise<void> {
    try {
        // 检查源文件夹是否存在
        if (!fs.existsSync(source)) {
            throw new Error(`源文件夹不存在: ${source} (请确保已构建该应用)`);
        }

        // 检查目标文件夹是否存在，不存在则创建
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
            console.log(`创建目标文件夹: ${destination}`);
        }

        // 读取源文件夹内容
        const entries = fs.readdirSync(source, { withFileTypes: true });
        
        // 跟踪复制的文件和文件夹数量
        let filesCopied = 0;
        let foldersProcessed = 0;

        for (const entry of entries) {
            const sourcePath = path.join(source, entry.name);
            const destPath = path.join(destination, entry.name);

            if (entry.isDirectory()) {
                // 如果是文件夹，递归复制
                await copyFolder(sourcePath, destPath, overwrite);
                foldersProcessed++;
            } else {
                // 如果是文件，直接复制
                if (overwrite || !fs.existsSync(destPath)) {
                    fs.copyFileSync(sourcePath, destPath);
                    filesCopied++;
                } else {
                    console.log(`跳过已存在文件: ${destPath}`);
                }
            }
        }

        console.log(`文件夹复制完成: ${source} -> ${destination} (复制了 ${filesCopied} 个文件, ${foldersProcessed} 个文件夹)`);
    } catch (err) {
        console.error('复制文件夹时出错:', err.message);
        throw err; // 重新抛出错误以便上层处理
    }
}
