from fabric.api import env, run, put, local
from fabric.context_managers import cd, prefix, shell_env, settings

env.use_ssh_config = True
env.hosts = ['tracker']

TARBALL = 'tracker.tar.gz'
REMOTE_DIR = 'tracker'
DIST_DIR = 'dist'
BACKUP_DIR = REMOTE_DIR + '.bk'
TMP_SUFFIX = '.tmp'

# helper functions
def _mv(src, dest):
    return ' '.join(['mv ', src, dest])

def _cp(src, dest, recursive=False):
    cmd = 'cp -r' if recursive else 'cp'
    return ' '.join([cmd, src, dest])

def _rm(target, recursive=False):
    cmd = 'rm -r' if recursive else 'rm'
    return ' '.join([cmd, target])

def _tar(filename, create, working_dir='.', target=''):
    cmd = 'tar -czvf' if create else 'tar -xzvf'
    return ' '.join([cmd, filename, '-C', working_dir, target])

def create_rollback():
    backup = BACKUP_DIR
    tmp = REMOTE_DIR + TMP_SUFFIX
    with settings(warn_only=True):
        run(_mv(backup, tmp))
        run(_cp(REMOTE_DIR, backup, recursive=True))
        # TODO should actually do rollback of this if it fails
        run(_rm(tmp))

def upload_files():
    local(_tar(TARBALL, create=True, working_dir=DIST_DIR, target='.'))
    put(TARBALL, '~/.')
    run(_tar(TARBALL, create=False, working_dir=REMOTE_DIR))

def install():
    # Could, in theory, rebuild virtual env here as well. Currently just update
    # pip & migrate
    with prefix('source ~/.virtualenvs/tracker/bin/activate'), cd('~/tracker/'):
        run('pip install -r requirements.txt')
        with shell_env(DJANGO_SETTINGS_MODULE='mood_tracker.settings.base'):
            run('python manage.py migrate')

# Cleanup commands
def cleanup():
    run(_rm(TARBALL))
    local(_rm(TARBALL))

def clean_remote():
    with settings(warn_only=True):
        run(_rm(REMOTE_DIR, recursive=True))
        run(_rm(BACKUP_DIR, recursive=True))
        run(_rm(TARBALL))

# Actual jobs
def rollback():
    run(_rm(REMOTE_DIR, recursive=True))
    run(_cp(BACKUP_DIR, REMOTE_DIR, recursive=True))
    print '\n\n\nWARNING this doesn\'t unroll migrations!\n\n\n'
    # TODO this should roll back migrations etc.

def deploy():
    create_rollback()
    upload_files()
    install()
    cleanup()

def deploy_initial():
    # Make our target directory
    run('mkdir ~/tracker')
    upload_files()
    install()
    # make an initial backup
    run(_cp(REMOTE_DIR, BACKUP_DIR, recursive=True))
    cleanup()

