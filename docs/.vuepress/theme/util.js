export const hashRE = /#.*$/;

export const extRE = /\.(md|html)$/;

export const endingSlashRE = /\/$/;

export const outboundRE = /^(https?:|mailto:|tel:)/;

export function normalize (path) {
    return decodeURI(path)
        .replace(hashRE, '')
        .replace(extRE, '');
}

export function getHash (path) {
    const match = path.match(hashRE);

    if (match) {
        return match[0];
    }
}

export function isExternal (path) {
    return outboundRE.test(path);
}

export function isMailto (path) {
    return /^mailto:/.test(path);
}

export function isTel (path) {
    return /^tel:/.test(path);
}

export function ensureExt (path) {
    if (isExternal(path)) {
        return path;
    }
    const hashMatch = path.match(hashRE);
    const hash = hashMatch ? hashMatch[0] : '';
    const normalized = normalize(path);

    if (endingSlashRE.test(normalized)) {
        return path;
    }
    return normalized + '.html' + hash;
}

export function isActive (route, path) {
    const routeHash = route.hash;
    const linkHash = getHash(path);

    if (linkHash && routeHash !== linkHash) {
        return false;
    }
    const routePath = normalize(route.path);
    const pagePath = normalize(path);

    return routePath === pagePath;
}

export function resolvePage (pages, rawPath, base) {
    if (base) {
        rawPath = resolvePath(rawPath, base);
    }
    const path = normalize(rawPath);

    for (let i = 0; i < pages.length; i++) {
        if (normalize(pages[i].path) === path) {
            return Object.assign({}, pages[i], {
                type: 'page',
                path: ensureExt(rawPath)
            });
        }
    }
    console.error(`[vuepress] No matching page found for sidebar item "${rawPath}"`);
    return {};
}

function resolvePath (relative, base, append) {
    const firstChar = relative.charAt(0);

    if (firstChar === '/') {
        return relative;
    }

    if (firstChar === '?' || firstChar === '#') {
        return base + relative;
    }

    const stack = base.split('/');

    // remove trailing segment if:
    // - not appending
    // - appending to trailing slash (last segment is empty)
    if (!append || !stack[stack.length - 1]) {
        stack.pop();
    }

    // resolve relative path
    const segments = relative.replace(/^\//, '').split('/');

    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];

        if (segment === '..') {
            stack.pop();
        } else if (segment !== '.') {
            stack.push(segment);
        }
    }

    // ensure leading slash
    if (stack[0] !== '') {
        stack.unshift('');
    }

    return stack.join('/');
}

// 解析页面侧边栏元素
export function resolveSidebarItems (page, route, site, localePath) {
    const { pages, themeConfig } = site;

    const localeConfig =
        localePath && themeConfig.locales ? themeConfig.locales[localePath] || themeConfig : themeConfig;

    const pageSidebarConfig = page.frontmatter.sidebar || localeConfig.sidebar || themeConfig.sidebar;

    if (pageSidebarConfig === 'auto') {
        return resolveHeaders(page);
    }

    const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar;

    if (!sidebarConfig) {
        return [];
    }
    const { base, config } = resolveMatchingConfig(route, sidebarConfig);

    return config ? config.map((item) => resolveItem(item, pages, base)) : [];
}

export function resolveFielDoc (site) {
    const { pages, themeConfig } = site;

    const fileDocSidebar = themeConfig.fileDocSidebar;

    return fileDocSidebar ? fileDocSidebar.map((item) => resolveItem(item, pages, '/')) : [];
}

// 解析页面的标题
function resolveHeaders (page) {
    const headers = groupHeaders(page.headers || []);

    // h2 有path，h3 没有path
    return [
        {
            type: 'group',
            collapsable: false,
            title: page.title,
            path: null,
            children: headers.map((h) => ({
                // h2
                type: 'auto',
                title: h.title,
                basePath: page.path,
                path: page.path + '#' + h.slug,
                // h3
                children: h.children || []
            }))
        }
    ];
}

/**
 *
 * @param {Array<Object>} headers 页面的headers，一个对象数组，元素level（h3 or h2），title（标题）
 * @returns 一个已经整理好的页面标题树形结构
 */
export function groupHeaders (headers) {
    // group h3s under h2
    headers = headers.map((h) => Object.assign({}, h));

    let lastH2;

    headers.forEach((h) => {
        if (h.level === 2) {
            lastH2 = h;
            lastH2.children = [];
        } else if (lastH2) {
            lastH2.children.push(h);
        }
    });
    return headers.filter((h) => h.level === 2);
}

export function resolveNavLinkItem (linkItem) {
    return Object.assign(linkItem, {
        type: linkItem.items && linkItem.items.length ? 'links' : 'link'
    });
}

export function resolveMatchingConfig (route, config) {
    if (Array.isArray(config)) {
        return {
            base: '/',
            config: config
        };
    }
    for (const base in config) {
        if (ensureEndingSlash(route.path).indexOf(base) === 0) {
            return {
                base,
                config: config[base]
            };
        }
    }
    return {};
}

function ensureEndingSlash (path) {
    return /(\.html|\/)$/.test(path) ? path : path + '/';
}

function resolveItem (item, pages, base, isNested) {
    if (typeof item === 'string') {
        return resolvePage(pages, item, base);
    }
    if (Array.isArray(item)) {
        return Object.assign(resolvePage(pages, item[0], base), {
            title: item[1]
        });
    }
    if (isNested) {
        console.error(
            '[vuepress] Nested sidebar groups are not supported. ' + 'Consider using navbar + categories instead.'
        );
    }
    const children = item.children || [];

    return {
        type: 'group',
        title: item.title,
        children: children.map((child) => resolveItem(child, pages, base, true)),
        collapsable: item.collapsable !== false
    };
}

export function formatTime (time) {
    const utcDate = new Date(time);
    // 世界时间转化为北京时间，相差8小时
    const tdate = new Date(utcDate - 8 * 60 * 60 * 100);
    const year = tdate.getFullYear();
    const month = tdate.getMonth() + 1;
    const day = tdate.getDate();
    const rtime = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);

    return rtime;
}
